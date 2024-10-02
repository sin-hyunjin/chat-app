interface props {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: props) => {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
