import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

function PrivateRoute({ children }) {
    const router = useRouter();

  useEffect(() => {
    const confirmActive = sessionStorage?.getItem("activeAdminUser");
    if (confirmActive === null || confirmActive === undefined) {
        router?.push("/login");
    }
  }, []);
    return (
        <div>{children}</div>
    )
}

export default PrivateRoute