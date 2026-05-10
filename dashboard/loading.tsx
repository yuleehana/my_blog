// import { useEffect, useState } from 'react';
// import './loading.scss';
// import { Router } from 'next/router';

// export default function Loading() {
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const showRoute = ['/', '/notes/:category', '/entry/:titleUrl/:id', '/guestbook'];
//     const start = (url: string) => {
//       if (showRoute.find((route) => String(url).includes(route))) {
//         setLoading(true);
//       }
//     };
//     const end = (url: string) => {
//       if (showRoute.find((route) => String(url).includes(route))) {
//         setLoading(false);
//       }
//     };
//     Router.events.on('routeChangeStart', start);
//     Router.events.on('routeChangeComplete', end);
//     Router.events.on('routeChangeError', end);
//     return () => {
//       Router.events.off('routeChangeStart', start);
//       Router.events.off('routeChangeComplete', end);
//       Router.events.off('routeChangeError', end);
//     };
//   }, []);

//   return <span className="loader"></span>;
// }
