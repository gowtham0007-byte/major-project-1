import React from 'react'

const Rating = ({ value, text, color = '#f59e0b' }) => {
  return (
    <div className="rating d-flex align-items-center gap-1 my-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          <i
            style={{ color }}
            className={
              value >= star
                ? 'fas fa-star'
                : value >= star - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          >★</i>
        </span>
      ))}
      {text && <span className="ms-2 text-secondary small fw-medium">{text}</span>}
    </div>
  )
}

export default Rating
