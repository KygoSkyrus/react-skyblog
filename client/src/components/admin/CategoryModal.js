import React from 'react'

const CategoryModal = (props) => {

    const {allCategory}=props


    async function addCat() {
        var cat = document.getElementById("cat").value;
        console.log(cat);

        const res = await fetch("/addCategory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cat,
            }),
        });

        const data = await res.json();
        console.log(data);
        if (data.message === "alreadyExists") {
            alert("category already exists");
        } else if (data.message === "categoryAdded") {
            window.location.reload();
        }
    }


    async function deleteCategory(id) {
        console.log(id);

        const res = await fetch("/deleteCategory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        const data = await res.json();
        console.log(data);
        if (data.message === "deleted") {
            window.location.reload();
        }
    }




  return (
    <>
    <div className="modal fade" id="manageCat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mt-0">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Categories</h5>
                            {/* <button type="button" id="close" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{
                                backgroundColor: "inherit",
                                border: "none",
                                outline: "none",
                                cursor: "pointer"
                            }}> */}
                                <i className="fa fa-window-close fa-2x" type="button" id="close"  data-bs-dismiss="modal" aria-label="Close"></i>
                            {/* </button> */}
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center justify-content-center text-center">
                                <div className="form-wrapper m-auto" style={{ width: "100%" }}>
                                    <div className="form-container my-4" style={{ maxWidth: "unset" }}>
                                        <div className="panel" style={{ border: "none", boxShadow: "none" }}>
                                            <form className="register-form">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="cat"
                                                        placeholder="add category" />
                                                </div>
                                                <section className="btn btn-success btn-block" onClick={e=>addCat(e)}>
                                                    Add category
                                                </section>
                                            </form>
                                        </div>
                                    </div>

                                    <div id="catInModal" className="mb-4 d-flex flex-wrap">
                                        {allCategory?.map(x=>{
                                            return(
                                                <section class="catinmodal" onClick={e=>deleteCategory(x._id,e)}>{x.category}&nbsp;&nbsp;<i class="fa fa-trash" id="ii" ></i></section>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default CategoryModal