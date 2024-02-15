import React from 'react'
import { Link } from 'react-router-dom'
import { WhatsappShareButton } from "react-share"

const BlogWrapperBottom = (props) => {

	const { data, displayRead, displayDesc, displayDetail } = props;

	const handleModal = (val) => {
		const dialog = document.querySelector("dialog");
		val === "show" ? dialog.showModal() : dialog.close()
	}

	function handleClick(event) {
		const dialog = document.querySelector("dialog");
		if (event.target === dialog) {
			dialog.close();
		}
	}

	return (
		<div className="post">
			<Link to={"/" + data?.url} state={{ url: data?.url }}>
				<img src={data?.image} alt="blog" className="img-fluid w-100" />
			</Link>

			<div className="post--right-content t-flex-100 t-pt-15">
				<ul className="list d-flex align-items-center">
					<li className="t-mr-16">
						<Link to={"/category/" + data?.category} state={{ category: data?.category }}
							className="t-link t-link--light tag tag--skew tag-beta text-uppercase">
							<span className="tag__skew-reverse">
								{data?.category}
							</span>
						</Link>
					</li>
					<li className="t-mr-16">
						<span className="t-link t-link--secondary ex-sm-text text-capitalize">
							<span className="las la-calendar-alt sm-text"></span>
							{data?.date}
						</span>
					</li>
					<li className="t-mr-16">
						<span className={"t-link t-link--secondary ex-sm-text text-capitalize " + displayRead} >
							<span className="fa fa-clock sm-text"></span>&nbsp;10 min read
						</span>
					</li>
					<li>
						<span className={"t-link t-link--secondary ex-sm-text text-capitalize cursor-pointer " + displayRead} >
							<WhatsappShareButton url={window.location.href} size={32} quote={'Dummy text!'} hashtag="#skyblog" >
								<span className="fa fa-share sm-text"></span>&nbsp;share
							</WhatsappShareButton>


							<button onClick={() => handleModal("show")}>Show the dialog</button>
							<dialog onClick={(e) => handleClick(e)}>
								<button autofocus onClick={() => handleModal("hide")}>Close</button>
								<p>DIAGLOg</p>
							</dialog>
						</span>
					</li>
				</ul>
				<h3 className="post__title t-mt-10">
					<Link to={"/" + data?.url} state={{ url: data?.url }} className="t-link t-link--secondary">
						{data?.title}
					</Link>
				</h3>
				<p className={"mb-0 " + displayDesc}>
					<u>{data?.shortdescription}</u>
				</p>
				<div className={'detailContent mt-4 ' + displayDetail} dangerouslySetInnerHTML={{ __html: data?.detail }}></div>

			</div>
		</div>
	)
}

export default BlogWrapperBottom