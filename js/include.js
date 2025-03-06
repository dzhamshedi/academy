function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain attribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function initializeSubmenu() {
    // Находим все триггеры подменю
    const submenuTriggers = document.querySelectorAll('.submenu-trigger');
    
    // Добавляем обработчик клика для каждого триггера
    submenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем переход по ссылке
            const parentLi = this.closest('.has-submenu');
            
            // Закрываем все открытые подменю, кроме текущего
            document.querySelectorAll('.has-submenu.open').forEach(item => {
                if (item !== parentLi) {
                    item.classList.remove('open');
                }
            });
            
            // Переключаем состояние текущего подменю
            parentLi.classList.toggle('open');
        });
    });
}

// Запускаем функцию после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    includeHTML();
    initializeSubmenu();
}); 