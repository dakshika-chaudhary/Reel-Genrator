"use client"
import React, { ReactNode } from 'react';
import Header from './_components/Header';
import SideNav from './_components/SideNav';  

import { useContext,useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {


  return (

    <div>
      <div className='hidden md:block h-screen bg-white fixed mt-[65px] w-64'>
        <SideNav />
      </div>
      <div>
        <Header />
        <div className='md:ml-64 mt-[65px]'>{children}</div>
      </div>
    </div>

  );
}

export default DashboardLayout;
