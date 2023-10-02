type Props = {
  amount: number;
  code?: string;
};

const Currency = ({ amount, code = "EUR" }: Props) => {
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: code,
    minimumFractionDigits: 0,
  }).format(amount);

  return <span>{formatted}</span>;
};

export default Currency;
