import React,{useContext, useState} from 'react'
import LoaderAPI from '../../LoaderAPI';
import { BlogContext } from '../../App';
import { useToast } from '../ToastContext';

const CategoryModal = () => {

    const { allCategory } = useContext(BlogContext);
    const [showLoader, setShowLoader] = useState(false)
    const { showToast } = useToast();

    async function addCategory() {
        setShowLoader(true)
        var cat = document.getElementById("cat").value;

        const res = await fetch("/admin/addCategory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cat,
            }),
        });

        const data = await res.json();

        setShowLoader(false)
        showToast(data.message)
        document.getElementById("cat").value="";
        if (data.isAdded) {
            window.location.reload();
            // document.getElementById("closeCategory").click();
        }
    }

    async function deleteCategory(id) {
        setShowLoader(true)
        const res = await fetch("/admin/deleteCategory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        const data = await res.json();
        setShowLoader(false)
        setShowLoader(false)
        showToast(data.message)
        if (data.isDeleted) {
            window.location.reload();
             // document.getElementById("closeCategory").click();
        }
    }

    return (
        <>
            <div className="modal fade" id="manageCat" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mt-0">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Categories</h5>
                            <i className="fa fa-window-close fa-2x" type="button" id="closeCategory" data-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center justify-content-center text-center">
                                <div className="form-wrapper m-auto" style={{ width: "100%" }}>
                                    <div className="form-container my-4" style={{ maxWidth: "unset" }}>
                                        <div className="panel" style={{ border: "none", boxShadow: "none" }}>
                                            <form className="register-form">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="cat"
                                                        placeholder="add category"/>
                                                </div>
                                                <section className="btn btn-success btn-block" onClick={e => addCategory(e)}>
                                                    Add category
                                                </section>
                                            </form>
                                        </div>
                                    </div>

                                    <div id="catInModal" className="mb-4 d-flex flex-wrap">
                                        {allCategory?.map(x => {
                                            return (
                                                <section className="catinmodal" key={x._id} onClick={e => deleteCategory(x._id, e)}>{x.category}&nbsp;&nbsp;<i className="fa fa-trash" id="ii" ></i></section>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoaderAPI  showLoader={showLoader} />
        </>
    )
}

export default CategoryModal