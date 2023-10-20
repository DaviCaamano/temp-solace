export const SideBarHeader = () => {
  return (
    <div
      id={'side-bar-header'}
      className={'h-20 w-full pl-[1rem] flex justify-center'}
      style={{
        borderBottomWidth: '13px',
        borderStyle: 'solid',
        borderImage: 'linear-gradient(to right, rgba(254, 91, 99, 0.5), rgba(254, 91, 99, 0.05)) 2 100%',
      }}
    >
      <span className={'text-2xl leading-[5rem] text-latte'}>History</span>
    </div>
  );
};
