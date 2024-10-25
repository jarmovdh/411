"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import SearchIcon from "../../../../../public/assets/icons/SearchIcon"
import CloseIcon from "../../../../../public/assets/icons/CloseIcon"
import { useRouter } from "next/navigation"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({
  placeholder = "Search",
  onSearch,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSearch = () => {
    router.push(`/search?q=${query}`)
    if (query.trim() && typeof onSearch === "function") {
      onSearch(query.trim())
    }
  }

  const toggleSearch = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setQuery("")
    }
  }

  const clearQuery = () => {
    setQuery("")
  }

  const inputVariants = {
    open: { paddingLeft: "0.5rem", paddingRight: "1.5rem" },
    closed: { width: 0, paddingLeft: 0, paddingRight: 0 },
  }

  return (
    <div className="relative">
      <motion.div
        className="flex items-center bg-transparent"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            width: "10rem",
            paddingLeft: "0.5rem",
            paddingRight: "1.5rem",
            transition: {
              type: "easeIn",
              damping: 24,
            },
            borderRadius: "25px",
            border: "1px solid",
          },
          closed: {
            width: "2.5rem",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            borderRadius: "25px",
            transition: {
              type: "easeOut",
              damping: 40,
            },
          },
        }}
      >
        <motion.div
          className="h-6 w-12 flex items-center justify-center bg-transparent cursor-pointer"
          onClick={toggleSearch}
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { x: 0 },
            closed: { x: 0 },
          }}
          transition={{ type: "easeIn", damping: 40 }}
        >
          <SearchIcon className="h-4 md:h-5" />
        </motion.div>
        <motion.input
          type="text"
          placeholder={placeholder}
          className="bg-transparent outline-none w-[120px]"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
          animate={isOpen ? "open" : "closed"}
          variants={inputVariants}
          transition={{ type: "easeIn", damping: 20 }}
        />
        {isOpen && query && (
          <motion.div
            className="h-8 w-8 flex items-center justify-center bg-transparent cursor-pointer absolute right-0 top-0"
            onClick={clearQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CloseIcon className="h-4" />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
