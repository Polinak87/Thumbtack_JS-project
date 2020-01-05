import React from 'react';

export const full = '-is-full';

export default function Content({children, full}) {
  return <div className={`card-content${full}`}>{children}</div>
} 