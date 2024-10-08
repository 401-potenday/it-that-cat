import IconCheck from '@/assets/images/icon_check.svg';
import IconChecked from '@/assets/images/icon_checked.svg';

interface CatMarkProps {
  onClick: () => void;
  isChecked?: boolean;
  className?: string;
}

const CatMark = ({ onClick, isChecked = false, className = '' }: CatMarkProps) => {
  return (
    <div
      className={`catMark transition-colors subHeading3 left-[110px] 
      ${isChecked ? 'border-gray-300 text-gray-400' : 'border-gray-100 text-gray-200'}
      ${className}`}
      onClick={onClick}
    >
      <span className='flex justify-center items-center'>{isChecked ? <IconChecked /> : <IconCheck />}</span>
      팔로우한 냥이만
    </div>
  );
};

export default CatMark;
