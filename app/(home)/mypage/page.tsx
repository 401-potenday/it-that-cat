'use client';
import { Fragment } from 'react';
import { useRouter } from 'next/navigation';

import IconEdit from '@/assets/images/mypage/icon_edit.svg';
import IconLogout from '@/assets/images/mypage/icon_logout.svg';
import { useModal } from '@/hooks/useModal';
import useNickname from '@/hooks/queries/useNickname';
import { MODAL_TYPE } from '@/components/common/Modal';
import NicknameModal from '@/components/MyPage/NicknameModal';
import UpdateNoticeModal from '@/components/MyPage/UpdateNoticeModal';
import DeleteUserModal from '@/components/MyPage/DeleteUserModal/indext';
import Loading from '@/components/common/Loading';
import { logout } from '@/apis/mypage';
import { deleteCookie } from '@/utils/cookieStore';

const MyPage = () => {
  const router = useRouter();
  const { data: nickname, refetch, isLoading } = useNickname();
  const { openModal } = useModal();

  const mypageMenu = [
    {
      id: 0,
      title: '나의 활동',
      depth: [
        {
          id: 0,
          title: '내가 등록한 냥이',
          handleClick: () => router.push('/mypage/mycontent'),
        },
        {
          id: 1,
          title: '작성한 냥이 소식',
          handleClick: () => router.push('/mypage/mycomment'),
        },
      ],
    },
    {
      id: 1,
      title: '고객센터',
      depth: [
        {
          id: 0,
          title: '공지사항',
          handleClick: () => openModal(MODAL_TYPE.UPDATE_NOTICE),
        },
        {
          id: 1,
          title: '1:1 서비스 문의',
          handleClick: () => openModal(MODAL_TYPE.UPDATE_NOTICE),
        },
      ],
    },
    {
      id: 2,
      title: '계정 관리',
      depth: [
        {
          id: 1,
          title: '회원탈퇴',
          handleClick: () => {
            openModal(MODAL_TYPE.DELETE_USER);
          },
        },
      ],
    },
  ];

  const handleLogOut = async () => {
    const response = await logout();
    if (response?.result === 'SUCCESS') {
      await deleteCookie('accessToken');
      await deleteCookie('nickname');
      await deleteCookie('refreshToken');
      router.push('/login');
    }
  };

  if (isLoading && !nickname) return <Loading />;

  return (
    <Fragment>
      {nickname && (
        <>
          <NicknameModal handleRefetchNickname={() => refetch()} />
          <UpdateNoticeModal />
          <DeleteUserModal />
        </>
      )}
      <div className='flex justify-end px-6 pt-7 pb-5'>
        <div className='text-gray-300 caption cursor-pointer pt-3 pb-5 flex items-center gap-1' onClick={handleLogOut}>
          <IconLogout />
          로그아웃
        </div>
      </div>

      <div className='px-6'>
        <h3 className='heading2 text-black flex gap-[6px] items-center'>
          {!isLoading && nickname ? nickname : <span className='w-20 h-6 bg-gray-50 rounded-sm animate-pulse' />}님
          <span onClick={() => openModal(MODAL_TYPE.MYPAGE_NICKNAME)} className='cursor-pointer'>
            <IconEdit />
          </span>
        </h3>

        <div>
          {mypageMenu.map(({ id, title, depth }) => (
            <ul key={id} className='text-gray-500'>
              <li className='subHeading pt-6 pb-2'>{title}</li>
              {depth.map((depth2) => (
                <li
                  key={depth2.id}
                  onClick={() => depth2.handleClick()}
                  className='body2 py-4 cursor-pointer border-b border-gray-50'
                >
                  {depth2.title}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default MyPage;
