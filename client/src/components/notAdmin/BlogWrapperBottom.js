import React from 'react'
import { Link } from 'react-router-dom'
import { EmailShareButton, FacebookIcon, FacebookMessengerIcon, FacebookShareButton, FacebookShareCount, InstapaperShareButton, LineShareButton, PinterestShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share"
import { SocialIcon } from 'react-social-icons'


const BlogWrapperBottom = (props) => {

	const { data, displayRead, displayDesc, displayDetail } = props;

	const handleModal = (val) => {
		console.log('handlemodal', val)
		const dialog = document.querySelector("dialog");
		val === "show" ? dialog.showModal() : dialog.close()
	}

	function handleClick(event) {
		console.log('handleclick', event.target)
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
				<ul className="list d-flex align-items-center text-center">
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
							<span className="fa fa-calendar-alt sm-text"></span>&nbsp;
							{data?.date}
						</span>
					</li>
					<li className="t-mr-16">
						<span className={"t-link t-link--secondary ex-sm-text text-capitalize " + displayRead} >
							<span className="fa fa-clock sm-text"></span>&nbsp;10 min read
						</span>
					</li>
					<li>
						<span className={"t-link t-link--secondary ex-sm-text text-capitalize cursor-pointer " + displayRead} onClick={() => handleModal("show")} >
							<span className="fa fa-share sm-text"></span>&nbsp;share
						</span>
						<dialog onClick={(e) => handleClick(e)}>
							{/* <button autoFocus onClick={() => handleModal("hide")}>Close</button> */}
							<div className='p-3'>
								<WhatsappShareButton url={window.location.href}>
									<SocialIcon network='whatsapp' />
								</WhatsappShareButton>

								<FacebookShareButton url={window.location.href}>
									<SocialIcon network='facebook' />
								</FacebookShareButton>

								<TelegramShareButton url={window.location.href} >
									<SocialIcon network='telegram' />
								</TelegramShareButton>

								<EmailShareButton url={window.location.href}>
									<SocialIcon network='email' />
								</EmailShareButton>

								<LineShareButton url={window.location.href}>
									<SocialIcon network='linkedin' />
								</LineShareButton>

								<PinterestShareButton url={window.location.href}>
									<SocialIcon network='pinterest' />
								</PinterestShareButton>

								<TwitterShareButton url={window.location.href}>
									<SocialIcon network='x' />
								</TwitterShareButton>

								<TwitterShareButton url={window.location.href}>
									<SocialIcon network='twitch' />
								</TwitterShareButton>

								<RedditShareButton url={window.location.href}>
									<SocialIcon network='reddit' />
								</RedditShareButton>

							</div>
						</dialog>
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