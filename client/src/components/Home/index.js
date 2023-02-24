import React from 'react'
import Navbar from "../Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
    <h1>Dogs Dating Dogs</h1>
    <h2>A Dog Dating Logic (Hamburger + Responsive + Router)</h2>
    <footer className="footer">
      <p className="footer-by">
        A project by{" "}
        <a
          href="https://twitter.com/erdemmkarakas"
          rel="noopener"
          className="small-link"
        >
          Danities Ichaba
        </a>
        <a
          href="https://twitter.com/danitiestech"
          rel="noopener"
          target="_blank"
          className="no-link icon-twitter"
          aria-label="Follow me on Twitter"
        ></a>
      </p>
    </footer>
  </>
  )
}
