import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function MoneyHubLogo() {
  return (
    <>
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
      >
      <Image
        src="/public/moneyhub-icon.png"
        alt="MoneyHub Logo"
        width={20}
        height={20}
      />
      <p className="text-[40px] ">MoneyHub</p>
    </div>
      </>
  );
}
