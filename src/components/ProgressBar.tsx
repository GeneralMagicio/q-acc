interface IProgressBarProps {
  progress: number;
  isStarted: boolean;
}

const ProgressBar: React.FC<IProgressBarProps> = ({ progress, isStarted }) => {
  return (
    <div
      className={`h-[5px] w-full rounded-full ${isStarted ? 'bg-[#EBECF2]' : 'bg-[#CBD5E0]'}`}
    >
      <div
        className={`h-[5px] rounded-full ${isStarted ? 'bg-[#EBECF2]' : 'bg-[#5326EC]'}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
