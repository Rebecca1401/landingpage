/**
 * Creates the navbar by render dynamically the sections navigation buttons
 */
function createNavbar() {
    const buttonList = [
        'Section 1',
        'Section 2',
        'Section 3',
        'Section 4'
    ];

    let ul = document.createElement('ul');
    ul.setAttribute('id', 'proList');
    ul.setAttribute('class', 'nav-menu');

    buttonList.forEach(function (buttonTitle, index) {
        let a = document.createElement('a');
        a.setAttribute('class', 'nav-link');
        a.innerHTML = buttonTitle;

        let li = document.createElement('li');
        li.setAttribute('class', 'nav-item');
        li.setAttribute('data-name', 'section' + index);
        li.appendChild(a);

        ul.appendChild(li);
    });
    document.getElementById('renderList').appendChild(ul);
}

/**
 * creates the click listener for the mobile menu
 * the listener only change ui styles
 */
function initNavigationMenu() {
    const buttonMenu = document.querySelector('.menu');
    const contentMenu = document.querySelector('.nav-menu');

    const openMenuFunction = function () {
        buttonMenu.classList.toggle('active'); // change the icon style to close
        contentMenu.classList.toggle('active'); // opens the menu
    };
    buttonMenu.addEventListener('click', openMenuFunction);

    const closeMenuFunction = function () {
        buttonMenu.classList.remove('active'); // change the icon style to menu
        contentMenu.classList.remove('active'); // closes the menu
    };

    const navLink = document.querySelectorAll('.nav-link');
    navLink.forEach(node => node.addEventListener('click', closeMenuFunction));
}

/**
 * Creates the click listener for each section nav button.
 */
function addMenuScrollToFunctionality() {
    const navButtons = document.querySelectorAll('.nav-item');

    const scrollToFunction = function (e) {
        let id = this.getAttribute('data-name');
        let part = document.getElementById(id);
        const yOffset = -getFirstSection().offsetHeight / 2;
        const y = part.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
        e.preventDefault();
    };

    navButtons.forEach(node => node.addEventListener('click', scrollToFunction));
}

/**
 * Unmark all sections
 */
function resetAllActiveSections() {
    const sections = document.getElementsByClassName('section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('isActive');
    }
}

/**
 * Marks the visible section as active
 */
function markVisibleSection() {
    let currentSection = getCurrentSectionIndex();
    if (currentSection > -1) {
        const sections = document.getElementsByClassName('section');
        sections[currentSection].classList.add('isActive');
    }
}

/**
 * Return the scrool offset of the html page
 * @returns {number}
 */
function getScrollOffset() {
    if (document.body.scrollTop) {
        return document.body.scrollTop;
    } else if (document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    }
    return 0;
}

/**
 * Sets the top button visible when it needs
 * Button is visible after scrolling 20px
 */
function checkTopButtonIsVisible() {
    const buttonTop = document.getElementById('buttonTop');
    if (getScrollOffset() > 20) {
        buttonTop.style.display = 'block';
    } else {
        buttonTop.style.display = 'none';
    }
}

/**
 * scrolls to top
 */
function scrollToTop() {
    document.body.scrollIntoView({behavior: 'smooth'});
    document.documentElement.scrollIntoView({behavior: 'smooth'});
}

/**
 * Returns the first section as Element
 * @returns {HTMLElement} section
 */
function getFirstSection() {
    const sectionList = document.getElementsByTagName('section');
    return sectionList[0];
}

/**
 * Returns the current index of a visible section
 * @returns {number} index of the section
 */
function getCurrentSectionIndex() {
    let currentSection = -1;
    const scrollOffset = getScrollOffset() + 300;
    const sectionList = document.getElementsByTagName('section');
    const firstItem = getFirstSection();

    for (let i = 0; i < sectionList.length; i++) {
        const section = sectionList[i];
        const divOffset = section.offsetTop - firstItem.offsetTop;
        if ((scrollOffset >= divOffset) && (scrollOffset <= divOffset + firstItem.offsetHeight)) {
            currentSection = i;
            break;
        }
    }
    return currentSection;
}

/**
 * initialize the one page application
 */
createNavbar();
initNavigationMenu();
addMenuScrollToFunctionality();
markVisibleSection(); // the default section should be marked

// add scroll listener
window.onscroll = function () {
    checkTopButtonIsVisible();
    resetAllActiveSections();
    markVisibleSection();
};
