import {useTranslation} from 'react-i18next'
import DemonBannerEn from '../img/demon-wallet-banner-en.png'
import DemonBannerVi from '../img/demon-wallet-banner-vi.png'

export const DemonWalletPromoteBanner = () => {
  const {i18n: {resolvedLanguage}} = useTranslation()

  const src = resolvedLanguage === "en" ? DemonBannerEn : DemonBannerVi

  const handleClick = () => window.open("https://demon.renec.foundation")

  return (
    <div onClick={handleClick} style={{width:"100%"}}>
      <img style={{cursor: "pointer"}} width="100%" src={src} />
    </div>
  )
}
