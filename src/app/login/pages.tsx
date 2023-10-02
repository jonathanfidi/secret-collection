export default function Page() {
  return (
    <>
      <header>
        <h1>DIOR</h1>
      </header>
      <main>
        <span style={{ color: "#868686" }}>BIENVENUE</span>
        <h2>WELCOME</h2>
        <span>いらっしゃいませ</span>
        <form action="">
          <input type="text" placeholder="Login" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </form>
      </main>
    </>
  );
}
