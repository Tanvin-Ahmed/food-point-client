import CountUp from "react-countup";

type Props = {
  label: string;
  count: number;
};

const Counter = ({ label, count }: Props) => {
  return (
    <div className="backdrop-blur-sm p-4 rounded-lg flex flex-col justify-center items-center">
      <h3 className="text-lg font-bold text-white">{label}</h3>
      <div className="flex justify-center items-center gap-1">
        <CountUp end={count} start={0} duration={5} className="text-white" />
        <p className="text-white">+</p>
      </div>
    </div>
  );
};

export default Counter;
