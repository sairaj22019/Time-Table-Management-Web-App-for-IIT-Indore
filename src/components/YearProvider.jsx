// src/components/YearProvider.jsx
'use client'

import { createContext, useContext } from 'react'

const YearContext = createContext()

export function YearProvider({ year, children }) {
  return <YearContext.Provider value={year}>{children}</YearContext.Provider>
}

export function useYear() {
  return useContext(YearContext)
}
