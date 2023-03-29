import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList';
import Navbar from './Navbar';

const Homepage = () => {

    const [allBlog, setAllBlog] = useState();
    const [allCategory,setAllCategory]=useState();

    useEffect(() => {
        getAllBlogs()
        getAllCategory()
    }, [])

    async function getAllBlogs() {
        const res = await fetch("/show", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        const data = await res.json();
        console.log(data);
        setAllBlog(data)
    }

    async function getAllCategory(x) {
        const res = await fetch("/showCategory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });
        const data = await res.json();
        setAllCategory(data)
    }

    return (
        <>
         {allBlog?<Navbar allBlog={allBlog}/>:""}
            <div>
                {allBlog?.map(x => {
                    return (
                        <div key={x._id} className="bg-dark m-2 text-light">
                            <a href={"/" + x.title}>
                                <img src={x.image} alt={x.title} />
                                <span>{x.title}</span>
                                <section>{x.shortdescription}</section>
                                <span>{x.authorname}</span>
                                <span>{x.detail}</span>
                                <span>{x.date}</span>
                            </a>
                        </div>
                    )
                })}



            </div>
            {allBlog && allCategory?<CategoryList allBlog={allBlog} allCategory={allCategory} />:""}

        </>
    )
}

export default Homepage