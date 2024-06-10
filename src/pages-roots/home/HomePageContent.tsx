'use client'


import { TCatalogueCategoryCardApi } from 'api/types/api.categories.types';
import { TApiProduct } from 'api/types/api.products.types';
import { TSectionAboutApi } from 'api/types/api.section.about.types';
import { EAppSettings } from "api/types/api.settings.types";
import { ModuleLoader } from "factories/module-loader/ModuleLoader";
import { useTypedSelector } from "hooks/redux/useTypedSelector";
import { TCollectBannerData } from 'hooks/useCollectBannerData/useCollectBannerData';
import { BannerAdvert } from 'modules/core/banner-advert/components/BannerAdvert';
import { PopularCategories } from 'modules/core/categories-popular/components/root/PopularCategories';
import { NewProducts } from 'modules/core/products-new/components/root/NewProducts';
import { PopularProducts } from 'modules/core/products-popular/components/root/PopularProducts';
import { SectionAbout } from 'modules/core/section-about/components/SectionAbout';
import { HeroSlider } from 'modules/core/slider-hero/components/HeroSlider/HeroSlider';
import s from 'pages-roots/home/HomePageContent.module.scss'
import { ERoutesModules } from "routes/types";
import { ReactFCC } from 'types/react';

const SUB_TO_NEWSLETTER_SECTION_HEIGHT_MIN = 96

const HomePageSectionWrapper: ReactFCC = ({ children }) => (
  <div className={s.HomePageContent__section}>
    {children}
  </div>
)

const HomePageContentSubToNewsletterSection = () => (
  <div className={s.HomePageContent__sectionContent}>
    <div className={s.HomePageContent__sectionInner}>
      <ModuleLoader
        isOnColorSection
        module={ERoutesModules.SUB_TO_NEWSLETTER}
        skeletonHeight={SUB_TO_NEWSLETTER_SECTION_HEIGHT_MIN}
      />
    </div>
  </div>
)

export type THomePageContent = {
  banners: TCollectBannerData['slides'];
  dataCategoriesPopular: TCatalogueCategoryCardApi[];
  dataProductsNew: TApiProduct[];
  dataProductsPopular: TApiProduct[];
  dataSectionAbout: TSectionAboutApi | null;
}

export const HomePageContent: ReactFCC<THomePageContent> = props => {

  const {
    banners,
    dataCategoriesPopular,
    dataProductsNew,
    dataProductsPopular,
    dataSectionAbout,
  } = props

  const {
    [EAppSettings.BANNER_MAIN_HERO_ENABLED]: isBannerMainHeroEnabled,
    [EAppSettings.BANNER_MAIN_CENTER_ENABLED]: isBannerMainCenterEnabled,
    [EAppSettings.SUBSCRIPTIONS_BLOCK_ENABLED]: isSubscriptionsBlockEnabled,
    [EAppSettings.POPULAR_CATEGORIES_ENABLED]: isPopularCategoriesEnabled,
    [EAppSettings.POPULAR_PRODUCTS_ENABLED]: isPopularProductsEnabled,
    [EAppSettings.NEW_PRODUCTS_ENABLED]: isNewProductsEnabled,
    [EAppSettings.ABOUT_MAIN_BLOCK_ENABLED]: isAboutMainBlockEnabled,
  } = useTypedSelector(state => state.settings.settings)

  return (
    <div className={s.HomePageContent__container}>
      {
        isBannerMainHeroEnabled && (
          <HomePageSectionWrapper>
            <HeroSlider slides={banners} />
          </HomePageSectionWrapper>
        )
      }

      {
        isPopularCategoriesEnabled && (
          <HomePageSectionWrapper>
            <PopularCategories data={dataCategoriesPopular} />
          </HomePageSectionWrapper>
        )
      }

      {
        isPopularProductsEnabled && (
          <HomePageSectionWrapper>
            <PopularProducts products={dataProductsPopular} />
          </HomePageSectionWrapper>
        )
      }

      {
        isBannerMainCenterEnabled && (
          <HomePageSectionWrapper>
            <BannerAdvert slides={banners} />
          </HomePageSectionWrapper>
        )
      }

      {
        isNewProductsEnabled && (
          <HomePageSectionWrapper>
            <NewProducts products={dataProductsNew} />
          </HomePageSectionWrapper>
        )
      }

      {isAboutMainBlockEnabled && !!dataSectionAbout &&  <SectionAbout data={dataSectionAbout} />}

      {
        isSubscriptionsBlockEnabled && (
          <ModuleLoader
            Component={HomePageContentSubToNewsletterSection}
            className={s.HomePageContent__sub_to_newsletter}
            moduleToCheckBeforeRender={ERoutesModules.SUB_TO_NEWSLETTER}
            skeletonHeight={SUB_TO_NEWSLETTER_SECTION_HEIGHT_MIN}
          />
        )
      }
    </div>
  );
};
