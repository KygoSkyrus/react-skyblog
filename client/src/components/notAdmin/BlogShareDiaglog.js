import React from 'react'
import { EmailShareButton, FacebookShareButton, LineShareButton, PinterestShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"
import { SocialIcon } from 'react-social-icons'

const BlogShareDiaglog = () => {

    function handleClick(event) {
        const dialog = document.querySelector("dialog");
        if (event.target === dialog) {
            dialog.close();
        }
    }

    return (
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
    )
}

export default BlogShareDiaglog