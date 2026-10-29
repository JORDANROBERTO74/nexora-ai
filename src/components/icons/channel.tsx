import type { SVGProps } from "react";

const ChannelIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect x="2" y="4" width="20" height="14" rx="4" fill="#c2410c" opacity="0.14" />
      <path
        d="M7 4v6a3 3 0 0 0 3 3h7"
        stroke="#c2410c"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="17" cy="13" r="2.4" fill="#c2410c" />
      <circle cx="7" cy="19.5" r="1.8" fill="#fdba74" />
    </svg>
  );
};

export default ChannelIcon;
