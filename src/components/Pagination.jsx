import React from "react"
import { Button } from "react-bootstrap"

export default function Pagination({ goToNextPage, goToPreviousPage }) {
  return (
    <div>
      {goToPreviousPage && (
        <Button variant="primary" onClick={goToPreviousPage}>
          Previous
        </Button>
      )}{" "}
      {goToNextPage && (
        <Button variant="primary" onClick={goToNextPage}>
          Next
        </Button>
      )}
    </div>
  )
}
