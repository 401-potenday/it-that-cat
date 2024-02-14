import { getContent, getComments } from '@/apis/contents';
import {
  GetContentParams,
  getCardContents,
  getMapContents,
} from '@/apis/map/getContents';
import {
  queryCardContentsKey,
  queryCommentsKey,
  queryContentKey,
  queryMapContentsKey,
} from '@/constants/queryKey';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useCardContents = (data: GetContentParams) => {
  return useInfiniteQuery(
    [queryCardContentsKey, data.position, data.follow],
    ({ pageParam = 1 }) => getCardContents({ ...data, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const itemsNum = lastPage.totalItems % lastPage.pageSize;
        const pages = lastPage.totalItems / lastPage.pageSize;
        const totalPages =
          itemsNum === 0 ? Math.floor(pages) : Math.floor(pages) + 1;
        return lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined;
      },
      staleTime: 1,
    },
  );
};

export const useMapContents = (data: GetContentParams) => {
  return useQuery(
    [queryMapContentsKey, data.position, data.follow],
    () => getMapContents(data),
    { staleTime: 1 },
  );
};

export const useContent = (contentId: string | null) => {
  return useQuery([queryContentKey], () => getContent(contentId), {
    staleTime: 1,
  });
};

export const useComments = (contentId: string | null) => {
  return useQuery([queryCommentsKey], () => getComments(contentId), {
    staleTime: 1,
  });
};
