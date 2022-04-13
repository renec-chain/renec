---
title: Install the Renec Tool Suite
---

There are multiple ways to install the Renec tools on your computer
depending on your preferred workflow:

- [Use Renec's Install Tool (Simplest option)](#use-renec-install-tool)
- [Download Prebuilt Binaries](#download-prebuilt-binaries)
- [Build from Source](#build-from-source)

## Use Renec's Install Tool

### MacOS & Linux

- Open your favorite Terminal application

- Install the Renec release
  [LATEST_RENEC_RELEASE_VERSION](https://github.com/remitano/renec/releases/tag/LATEST_RENEC_RELEASE_VERSION) on your
  machine by running:

```bash
sh -c "$(curl -sSfL https://s3.amazonaws.com/release.renec.foundation/LATEST_RENEC_RELEASE_VERSION/install)"
```

- You can replace `LATEST_RENEC_RELEASE_VERSION` with the release tag matching
  the software version of your desired release.

- The following output indicates a successful update:

```text
downloading LATEST_RENEC_RELEASE_VERSION installer
Configuration: /home/renec/.config/renec/install/config.yml
Active release directory: /home/renec/.local/share/renec/install/active_release
* Release version: LATEST_RENEC_RELEASE_VERSION
* Release URL: https://github.com/remitano/renec/releases/download/LATEST_RENEC_RELEASE_VERSION/renec-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

- Depending on your system, the end of the installer messaging may prompt you
  to

```bash
Please update your PATH environment variable to include the renec programs:
```

- If you get the above message, copy and paste the recommended command below
  it to update `PATH`
- Confirm you have the desired version of `renec` installed by running:

```bash
renec --version
```

- After a successful install, `renec-install update` may be used to easily
  update the Renec software to a newer version at any time.

---
### Linux

Download the binaries by navigating to
[https://github.com/remitano/renec/releases/latest](https://github.com/remitano/renec/releases/latest),
download **renec-release-x86_64-unknown-linux-msvc.tar.bz2**, then extract the
archive:

```bash
tar jxf renec-release-x86_64-unknown-linux-gnu.tar.bz2
cd renec-release/
export PATH=$PWD/bin:$PATH
```

### MacOS

Download the binaries by navigating to
[https://github.com/remitano/renec/releases/latest](https://github.com/remitano/renec/releases/latest),
download **renec-release-x86_64-apple-darwin.tar.bz2**, then extract the
archive:

```bash
tar jxf renec-release-x86_64-apple-darwin.tar.bz2
cd renec-release/
export PATH=$PWD/bin:$PATH
```

## Build From Source

If you are unable to use the prebuilt binaries or prefer to build it yourself
from source, navigate to
[https://github.com/remitano/renec/releases/latest](https://github.com/remitano/renec/releases/latest),
and download the **Source Code** archive. Extract the code and build the
binaries with:

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

You can then run the following command to obtain the same result as with
prebuilt binaries:

```bash
renec-install init
```
