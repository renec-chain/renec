import React from "react";
import bs58 from "bs58";
import { useHistory, useLocation } from "react-router-dom";
import Select, {
  InputActionMeta,
  ActionMeta,
  ValueType,
  components,
  ValueContainerProps,
} from "react-select";
import StateManager from "react-select";
import {
  LOADER_IDS,
  PROGRAM_INFO_BY_ID,
  SPECIAL_IDS,
  SYSVAR_IDS,
  LoaderName,
} from "utils/tx";
import { Cluster, useCluster } from "providers/cluster";
import { useTokenRegistry } from "providers/mints/token-registry";
import { TokenInfoMap } from "@ngocbv/rpl-token-registry";
import { ReactComponent as SearchIcon } from "img/icons/search.svg";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export function SearchBar() {
  const [search, setSearch] = React.useState("");
  const selectRef = React.useRef<StateManager<any> | null>(null);
  const history = useHistory();
  const location = useLocation();
  const { tokenRegistry } = useTokenRegistry();
  const { cluster, clusterInfo } = useCluster();
  const { t } = useTranslation();

  const onChange = (
    { pathname }: ValueType<any, false>,
    meta: ActionMeta<any>
  ) => {
    if (meta.action === "select-option") {
      history.push({ ...location, pathname });
      setSearch("");
    }
  };

  const onInputChange = (value: string, { action }: InputActionMeta) => {
    if (action === "input-change") setSearch(value);
  };

  const resetValue = "" as any;
  return (
    <div className="container my-4">
      <div className="row align-items-center">
        <div className="col">
          <Select
            ref={(ref) => (selectRef.current = ref)}
            options={buildOptions(
              search,
              cluster,
              tokenRegistry,
              clusterInfo?.epochInfo.epoch
            )}
            noOptionsMessage={() => t("no_results")}
            placeholder={t("main_searchbar_title")}
            value={resetValue}
            inputValue={search}
            blurInputOnSelect
            onMenuClose={() => selectRef.current?.blur()}
            onChange={onChange}
            styles={{
              /* work around for https://github.com/JedWatson/react-select/issues/3857 */
              placeholder: (style) => ({ ...style, pointerEvents: "none" }),
              input: (style) => ({ ...style, width: "100%" }),
            }}
            onInputChange={onInputChange}
            components={{
              DropdownIndicator,
              IndicatorSeparator,
              ValueContainer,
            }}
            classNamePrefix="search-bar"
          />
        </div>
      </div>
    </div>
  );
}

function buildProgramOptions(search: string, cluster: Cluster) {
  const matchedPrograms = Object.entries(PROGRAM_INFO_BY_ID).filter(
    ([address, { name, deployments }]) => {
      if (!deployments.includes(cluster)) return false;
      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        address.includes(search)
      );
    }
  );

  if (matchedPrograms.length > 0) {
    return {
      label: i18n.t("programs"),
      options: matchedPrograms.map(([address, { name }]) => ({
        label: name,
        value: [name, address],
        pathname: "/address/" + address,
      })),
    };
  }
}

const SEARCHABLE_LOADERS: LoaderName[] = [
  "BPF Loader",
  "BPF Loader 2",
  "BPF Upgradeable Loader",
];

function buildLoaderOptions(search: string) {
  const matchedLoaders = Object.entries(LOADER_IDS).filter(
    ([address, name]) => {
      return (
        SEARCHABLE_LOADERS.includes(name) &&
        (name.toLowerCase().includes(search.toLowerCase()) ||
          address.includes(search))
      );
    }
  );

  if (matchedLoaders.length > 0) {
    return {
      label: i18n.t("program_loaders"),
      options: matchedLoaders.map(([id, name]) => ({
        label: name,
        value: [name, id],
        pathname: "/address/" + id,
      })),
    };
  }
}

function buildSysvarOptions(search: string) {
  const matchedSysvars = Object.entries(SYSVAR_IDS).filter(
    ([address, name]) => {
      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        address.includes(search)
      );
    }
  );

  if (matchedSysvars.length > 0) {
    return {
      label: i18n.t("sysvars"),
      options: matchedSysvars.map(([id, name]) => ({
        label: name,
        value: [name, id],
        pathname: "/address/" + id,
      })),
    };
  }
}

function buildSpecialOptions(search: string) {
  const matchedSpecialIds = Object.entries(SPECIAL_IDS).filter(
    ([address, name]) => {
      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        address.includes(search)
      );
    }
  );

  if (matchedSpecialIds.length > 0) {
    return {
      label: i18n.t("account"),
      options: matchedSpecialIds.map(([id, name]) => ({
        label: name,
        value: [name, id],
        pathname: "/address/" + id,
      })),
    };
  }
}

function buildTokenOptions(
  search: string,
  cluster: Cluster,
  tokenRegistry: TokenInfoMap
) {
  const matchedTokens = Array.from(tokenRegistry.entries()).filter(
    ([address, details]) => {
      const searchLower = search.toLowerCase();
      return (
        details.name.toLowerCase().includes(searchLower) ||
        details.symbol.toLowerCase().includes(searchLower) ||
        address.includes(search)
      );
    }
  );

  if (matchedTokens.length > 0) {
    return {
      label: i18n.t("tokens"),
      options: matchedTokens.map(([id, details]) => ({
        label: details.name,
        value: [details.name, details.symbol, id],
        pathname: "/address/" + id,
      })),
    };
  }
}

function buildOptions(
  rawSearch: string,
  cluster: Cluster,
  tokenRegistry: TokenInfoMap,
  currentEpoch?: number
) {
  const search = rawSearch.trim();
  if (search.length === 0) return [];

  const options = [];

  const programOptions = buildProgramOptions(search, cluster);
  if (programOptions) {
    options.push(programOptions);
  }

  const loaderOptions = buildLoaderOptions(search);
  if (loaderOptions) {
    options.push(loaderOptions);
  }

  const sysvarOptions = buildSysvarOptions(search);
  if (sysvarOptions) {
    options.push(sysvarOptions);
  }

  const specialOptions = buildSpecialOptions(search);
  if (specialOptions) {
    options.push(specialOptions);
  }

  const tokenOptions = buildTokenOptions(search, cluster, tokenRegistry);
  if (tokenOptions) {
    options.push(tokenOptions);
  }

  if (!isNaN(Number(search))) {
    options.push({
      label: i18n.t("block"),
      options: [
        {
          label: `Slot #${search}`,
          value: [search],
          pathname: `/block/${search}`,
        },
      ],
    });

    if (currentEpoch !== undefined && Number(search) <= currentEpoch + 1) {
      options.push({
        label: i18n.t("epoch"),
        options: [
          {
            label: `Epoch #${search}`,
            value: [search],
            pathname: `/epoch/${search}`,
          },
        ],
      });
    }
  }

  // Prefer nice suggestions over raw suggestions
  if (options.length > 0) return options;

  try {
    const decoded = bs58.decode(search);
    if (decoded.length === 32) {
      options.push({
        label: i18n.t("account"),
        options: [
          {
            label: search,
            value: [search],
            pathname: "/address/" + search,
          },
        ],
      });
    } else if (decoded.length === 64) {
      options.push({
        label: i18n.t("transaction"),
        options: [
          {
            label: search,
            value: [search],
            pathname: "/tx/" + search,
          },
        ],
      });
    }
  } catch (err) {}
  return options;
}

const DropdownIndicator = () => null;

const IndicatorSeparator = () => null;

const ValueContainer = ({
  children,
  ...props
}: ValueContainerProps<any, any>) => {
  return (
    components.ValueContainer && (
      <components.ValueContainer {...props}>
        <div className="d-flex flex-grow-1 align-items-center">
          <SearchIcon />
          {children}
        </div>
      </components.ValueContainer>
    )
  );
};
