import Image from "next/image";
import Link from "next/link";
import Fuse from 'fuse.js'
import Tags from "../atoms/Tag";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import { v4 } from "uuid";
import { useContext, useState } from "react";
import { GlobalContext } from "@/context";

export default function SearchbarWithBtn({ setResult, label, href, results, data, tags }) {
  const [categories, setCategories] = useState([])
  const [selectedTag, setSelectedTag] = useState('')
  const [isSelected, setIsSelected] = useState(false)
  const url = process.env.NEXT_PUBLIC_API_URL
  const { token } = useContext(GlobalContext)

  const handleSearch = (pattern) => {
    if (!pattern || !href) {
      setResult(data)
      console.log('couldn\' search')
      return
    }

    const type = label.split(" ")[1].toLowerCase()

    const fuse = new Fuse(data, {
      keys: [`${type}_title`],
    })

    const result = fuse.search(pattern)
    const matches = []
    if (!results.length) {
      setResult(data)
    } else {
      result.forEach(({item}) => {
        matches.push(item)
      })
      setResult(matches)
    }
  }

  const handleFilter = (pattern) => {
    console.log(pattern)
    if (!pattern) {
      setResult(data)
      console.log('couldn\' search')
      return
    }

    const fuse = new Fuse(data, {
      keys: ['categories.category_name'],
    })

    const result = fuse.search(pattern)
    const matches = []
    if (!results.length) {
      setResult(data)
    } else {
      result.forEach(({item}) => {
        matches.push(item)
      })
      setResult(matches)
    }
    setSelectedTag(pattern)
    setIsSelected(true)
  }

  const fetchCategories = async () => {
    const type = label.split(" ")[1].toLowerCase()
    const response = await fetch(`${url}/categories/${type}`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    const result = await response.json()
    setCategories(result.categories)
  }

  return (
    <>
      <div className="flex justify-between h-[40px] w-full">
        <input
          className="w-[83%] bg-white rounded-[10px] px-8 p-2 outline-none focus:border-4 focus:border-blue-500 focus:ring-blue-500 placeholder:text-md"
          style={{
            boxShadow:
            "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
          }}
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Link href={href} className="flex justify-around px-5 w-[15%] rounded-[10px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700">
          <Image src="/add.svg" alt="add" width={20} height={20} />
          <div className="my-auto text-white font-bold spacing tracking-[0.86px] text-md">
            {label}
          </div>
        </Link>
      </div>
      <div className="flex justify-between mt-4 mb-6">
        <div className="flex gap-x-[12px]">
          {!isSelected ? (
            tags.map((tag) => {
              return <Tags filter={handleFilter} tag={tag} tagId={v4()} key={v4()} />;
            })
          ) : (
              <Tag>
                <div
                  className="flex justify-center items-center bg-white rounded-[40px] px-7 h-[32px] w-auto cursor-pointer shadow-lg"
                >
                  <span className="font-semibold text-md spacing" key={selectedTag}>
                    {selectedTag}
                  </span>
                  <TagCloseButton onClick={() => {
                    setIsSelected(false)
                    setResult(data)
                  }} />
                </div>
              </Tag>
          )}
        </div>
        <Menu
          className="flex justify-center items-center"
          onClick={fetchCategories}
        >
          <MenuButton onClick={fetchCategories} as={Button} className="font-semibold text-md spacing tracking-[0.86px] bg-white rounded-[40px] px-8 h-[32px] w-auto shadow-lg">
            All
          </MenuButton>
          <MenuList>
            {categories && (
              categories.map((category) => {
                return <MenuItem key={category.category_id} onClick={() => handleFilter(category.category_name)}>{category.category_name}</MenuItem>
              })
            )}
          </MenuList>
        </Menu>
      </div>
    </>
  );
}
