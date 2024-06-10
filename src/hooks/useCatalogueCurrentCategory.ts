'use client';

import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import {
  getCatalogueCurrentCategory,
  TGetCatalogueCurrentCategory,
} from 'api/ssr/utils/get-catalogue-current-category';
import { useTypedSelector } from 'hooks/redux/useTypedSelector';
import { useUrlHelpers } from 'hooks/useUrlHelpers';
import { CATALOGUE_PAGE_ROUTE_PAGE_SLUG } from 'pages-roots/catalogue/CataloguePage.constants';
import { PAGE_CATALOGUE_ROUTE } from 'routes/paths';
import { isArrayAndNotEmpty } from 'utils/array';
import { getChunkFromPathname } from 'utils/http/url';
import { REGEXP_PATHNAME_CHUNK_FIRST } from 'variables/regex';


export const useCatalogueCurrentCategory = (props?: TGetCatalogueCurrentCategory) => {

  const {
    categoryId: categoryIdProp,
    links: linksProp,
    slug: slugProp,
  } = props ?? {}

  const pathname = usePathname()

  const slugFromUrl = useMemo(() => getChunkFromPathname({
    matcher: REGEXP_PATHNAME_CHUNK_FIRST,
    pathname,
    splitFrom: PAGE_CATALOGUE_ROUTE,
    trimLeadingSlash: true,
  }), [ pathname ])

  const idFromUrl = useMemo(() => parseInt(slugFromUrl?.split('/')?.[0] || ''), [ slugFromUrl ])
  const humanFriendlySlug = useMemo(() => slugFromUrl?.split('/')?.[1], [ slugFromUrl ])

  const { links: linksStore } = useTypedSelector(store => store.catalogue.menu)

  const links = isArrayAndNotEmpty(linksProp) ? linksProp : linksStore

  const { search: { [CATALOGUE_PAGE_ROUTE_PAGE_SLUG]: searchParamSlug } } = useUrlHelpers();

  const slug = searchParamSlug ?? slugProp ?? humanFriendlySlug

  const categoryInfo = useMemo(() => getCatalogueCurrentCategory({
    categoryId: categoryIdProp || idFromUrl,
    links,
    slug,
  }), [
    categoryIdProp,
    links,
    slug,
    idFromUrl,
  ])

  const {
    breadcrumbs,
    id,
    slug: categoryInfoSlug,
  } = categoryInfo ?? {}

  return {
    breadcrumbs,
    id,
    slug: slug ?? categoryInfoSlug,
  };
}
