//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  new MOJFrontend.ButtonMenu({
    container: document.querySelector(".moj-button-menu"),
    mq: "(min-width: 200em)",
    buttonText: "Update referral",
    menuClasses: "moj-button-menu__wrapper--right",
    buttonClasses:
    "govuk-button--secondary moj-button-menu__toggle-button--secondary",
  });
})
