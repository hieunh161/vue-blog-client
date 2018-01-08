// Message rules:
// 1. Order will follow: Large -> medium -> small
// 2. Components: label, button, message, title
// 3. Categories: screen, modal,
// 4. component -> category -> specific

/* eslint-disable quotes */
const messages = {
  en: {
    message: {
      page_not_found: {
        error: `404`,
        title: `Page Not Found`,
        content: `We are sorry but the page you are looking for does not exist.<br><br>
                  You can always find insightful posts on our <a href='/'>homepage</a>`,
      },
      upload_image: {
        try_again: `Please try again!`,
        upload_failed: `Upload failed.`,
        change_cover_image: `Change Cover Image`,
        uploading: `Uploading...`,
        upload_hint: `Add cover image to make your post more attractive<br>
                    <i class="ui icon cloud upload"></i>
                    Drag your file here to begin or click to browse`,
        upload_modal_hint: `<i class="ui icon cloud upload"></i>
                    Drag your file here to upload<br> or click to browse`,
        upload_modal_title: `Upload Image To Imgur`,
      },
      article_edit: {
        publish_header: `Ready to publish?`,
        select_category: `Select Category`,
        add_tag: `Add tag`,
      },
      article_list: {
        min_read: `min read`,
      },
    },
    button: {
      upload_image: {
        preview: `Preview`,
      },
      article_edit: {
        publish: `Publish`,
        save_draft: `Save Draft`,
        private: `Private`,
        view_article: `View Article`,
        upload_image: `Upload Image`,
      },
      common: {
        confirm: `Confirm`,
        close: `Close`,
        cancel: `Cancel`,
      },
    },
    warning: {
      article_edit: {
        empty_title: `Title is empty. Please add title before publish!`,
      },
    },
  },
  ja: {
    message: {
      hello: `こんにちは、世界`,
      article_title: `Untitled Post`,
      button_common_confirm: `Confirm`,
    },
  },
  vn: {
    message: {
      hello: `こんにちは、世界`,
      article_title: `Tiêu đề`,
      button_common_confirm: `Confirm`,
    },
  },
};

export default messages;
