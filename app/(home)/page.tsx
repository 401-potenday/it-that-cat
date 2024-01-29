'use client';
import useGeolocation from '@/hooks/useGeolocation';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import IconCurrMapPin from '@/assets/images/icon_currentMapPin.svg';
import mapPin from '@/assets/images/icon_mapPin.png';
import useAddress from '@/hooks/useAddress';
import getAddress, { RegionState } from '@/apis/map/getAddress';
import MapComponent from '@/components/Map/Map';

export default function Home() {
  useKakaoLoader();
  const geolocation = useGeolocation();

  const initAddress = useAddress();
  const [address, setAddress] = useState<undefined | RegionState>();

  const [data, setData] = useState<{
    level: number;
    position: {
      lat: number;
      lng: number;
    };
  }>();

  const pinList = [
    { lat: 35.17183079055732, lng: 129.0556621326331 },
    { lat: 35.1716984775722, lng: 129.05708553844048 },
    { lat: 35.17275369644841, lng: 129.05557562177881 },
    { lat: 35.171488702430636, lng: 129.0561720817253 },
  ];

  if (geolocation.position === null) return null;
  const handleCenterChanged = async (map: kakao.maps.Map) => {
    const level = map.getLevel();
    const latlng = map.getCenter();

    const position = { lat: latlng.getLat(), lng: latlng.getLng() };

    setData({
      level: level,
      position: position,
    });

    const addr = await getAddress(position);

    setAddress(addr);
  };

  return (
    <div className='relative h-full overflow-hidden'>
      <MapComponent onCenterChanged={handleCenterChanged} isPanto level={4}>
        {pinList.map(
          (position) =>
            data &&
            data.position !== position && (
              <div
                className='bg-gray-500'
                key={`${position.lat}-${position.lng}`}
              >
                <MapMarker
                  position={{ lat: position.lat, lng: position.lng }}
                  onClick={() => setData({ level: 2, position: position })}
                  image={{
                    src: `${mapPin.src}`, // 마커이미지의 주소입니다
                    size: {
                      width: 46,
                      height: 59,
                    }, // 마커이미지의 크기입니다
                    options: {
                      offset: {
                        x: 23,
                        y: 59,
                      }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                  }}
                />
              </div>
            ),
        )}
      </MapComponent>
    </div>
  );
}
