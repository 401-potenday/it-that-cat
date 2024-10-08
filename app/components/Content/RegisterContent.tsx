'use client';
import { useEffect, useState } from 'react';

import RegisterMap from '@/components/Register/Map';
import RegisterPost from '@/components/Register/Post';
import { RegisterCatObjProps } from '@/types/content';
import { Coordinates, RegionState } from '@/types/address';
import useGeolocation from '@/hooks/useGeolocation';
import useAddress from '@/hooks/useAddress';
import { useGeolocationStore } from '@/stores/home/store';

const RegisterContent = ({
  data,
  initMode,
  isNew = true,
}: {
  data?: RegisterCatObjProps;
  initMode: 'map' | 'post';
  isNew?: boolean;
}) => {
  const currentGeolocation = useGeolocation();
  const initAddress = useAddress();
  const [mode, setMode] = useState<string>(initMode);
  const [isFillingIn, setIsFillingIn] = useState<boolean>(false);
  const {
    geolocation: { position, address },
  } = useGeolocationStore();
  const [catInfo, setCatInfo] = useState<RegisterCatObjProps>({
    name: '',
    description: '',
    lng: '',
    lat: '',
    jibunAddrName: '',
    jibunSido: '',
    jibunSigungu: '',
    jibunDong: '',
    jibunMainAddrNo: '',
    jibunSubAddrNo: '',
    neuter: '',
    group: '',
    catPersonalities: [],
    images: [],
    imageKeys: [],
    catEmoji: 0,
  });

  const updateCatInfo = (position: Coordinates | null, address: RegionState | null) =>
    setCatInfo((value: RegisterCatObjProps) => ({
      ...value,
      lng: String(position?.lng),
      lat: String(position?.lat),
      jibunAddrName: address?.addrName,
      jibunSido: address?.sido,
      jibunSigungu: address?.sigungu,
      jibunDong: address?.dong,
      jibunMainAddrNo: address?.mainAddrNo,
      jibunSubAddrNo: address?.subAddrNo,
    }));

  useEffect(() => {
    // 등록 페이지에서 사용하는 컴포넌트일 경우 초기 주소 사용
    if (isNew) {
      updateCatInfo(currentGeolocation.position, initAddress);
    }
  }, [currentGeolocation, initAddress, isNew]);

  useEffect(() => {
    updateCatInfo(position, address);
  }, [position, address]);

  useEffect(() => {
    if (data) {
      setCatInfo(() => data);
    }
  }, [data]);

  return (
    <div className='h-full'>
      {mode === 'map' ? (
        <RegisterMap isFillingIn={isFillingIn} setMode={setMode} initAddress={initAddress} />
      ) : (
        <RegisterPost
          setIsFillingIn={setIsFillingIn}
          setMode={setMode}
          catInfo={catInfo}
          setCatInfo={setCatInfo}
          isNew={isNew}
        />
      )}
    </div>
  );
};

export default RegisterContent;
