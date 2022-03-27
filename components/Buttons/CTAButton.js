import React from "react"
import Link from "next/link"
const CTAButton = ({ variant, ...props }) => {
  return (
    <Link href={props.href}>
      <a {...props} className={variant === "secondary" ? "button-secondary" : "button-primary"}>
        <button tabIndex='0' className='outline-none'>
          {props.title}
        </button>
      </a>
    </Link>
  )
}

export default CTAButton
