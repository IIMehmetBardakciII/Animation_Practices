import Link from "next/link"

const NavForPageTransition = () => {
  return (
    <nav className="flex justify-around ">
      <div className="logo">Logo</div>
      <div className="links flex gap-5 text-3xl">
        <Link href="/">home</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  )
}

export default NavForPageTransition