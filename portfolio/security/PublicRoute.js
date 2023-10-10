import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

function PublicRoute({children}) {
    const router = useRouter();
useEffect(() => {
  const confirmActive = sessionStorage?.getItem("activeAdminUser");
  if (confirmActive !== null && confirmActive !== undefined) {
      router?.push("/adminProfile");
  }
}, []);
 
  return (
    <div>{children}</div>
  )
}

export default PublicRoute