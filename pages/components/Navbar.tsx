import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <h2>Home</h2>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <h2>About</h2>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <h2>Contact</h2>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
