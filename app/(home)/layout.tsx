import type { Metadata } from 'next';
import './globals.css';
import RootWrapper from '@/components/RootWrapper';
import Script from 'next/script';
import pretendard from '@/components/Pretendard';
import QueryWrapper from '@/components/QueryWrapper';

export const metadata: Metadata = {
  title: '이냥저냥',
  description:
    '동네 길고양이의 위치와 정보를 등록하고 최근 소식을 사진과 함께 공유하는 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.className}`}>
        <QueryWrapper>
          <RootWrapper>
            <div className='h-full overflow-hidden'>{children}</div>
          </RootWrapper>
        </QueryWrapper>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=clusterer&autoload=false`}
          strategy='beforeInteractive'
        />
      </body>
    </html>
  );
}
