type Props = {
  width?: string;
  height?: string;
};

export const OptionDotIcon = ({ width = "18px", height = "18px" }: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i"
      style={{ width: width, height: height }}
      fill="currentColor"
    >
      <g>
        <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
      </g>
    </svg>
  );
};
