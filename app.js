const newWords = {
    wordH2Input: document.getElementById("japanese"),
    wordMeaningInput: document.getElementById("english")
  };
  const html1 = '<li class="card border-success m-3" style="width: 18rem;"><div class="card-body"><input type="textbox" class="card-title" value="';
  const html2 = '" disabled></input><input type="textbox" class="card-text" value="';
  const html3 = '" disabled></input></div><div class="flex mb-3"><button type="button" class="btn btn-outline-warning edit">edit</button><button type="button" class="btn btn-outline-info update">update</button><button type="button" class="btn btn-outline-danger delete">delete</button></div></li>';
  const validate = document.querySelector('input');

  document.querySelector("#add-button").addEventListener("click", addWord);

  loadWords();

  function addWord(event) {
    if (validate.value === "") {
      alert("성함을 입력해주세요");
    } else {
      event.preventDefault();
      const d1 = document.getElementById('card');
      const japaneseValue = newWords.wordH2Input.value;
      const englishValue = newWords.wordMeaningInput.value;

      d1.insertAdjacentHTML('beforeend', html1 + japaneseValue + html2 + englishValue + html3);

      saveWord(japaneseValue, englishValue);

      document.getElementById("japanese").value = "";
      document.getElementById("english").value = "";
    }
  }

  function saveWord(japanese, english) {
    const savedWords = JSON.parse(localStorage.getItem("words")) || [];
    savedWords.push({ japanese, english });
    localStorage.setItem("words", JSON.stringify(savedWords));
  }

  function loadWords() {
    const savedWords = JSON.parse(localStorage.getItem("words")) || [];

    const d1 = document.getElementById('card');
    d1.innerHTML = '';

    savedWords.forEach((word) => {
      d1.insertAdjacentHTML('beforeend', html1 + word.japanese + html2 + word.english + html3);
    });
  }

  const string1 = '<input class="update-input-box" type="text" placeholder="';
  const string2 = '"></input>';

  document.getElementById('card').addEventListener('click', function (e) {
    const tgt = e.target;
    const parent = tgt.closest('li');
    const japanese = parent.querySelector(".card-title");

    if (tgt.classList.contains('delete')) {
      parent.remove();
      removeWord(japanese.value);
    } else if (tgt.classList.contains('edit')) {
      japanese.removeAttribute('disabled');
      japanese.style.border = "1px solid rgb(224, 140, 154)";
    } else if (tgt.classList.contains('update')) {
      japanese.setAttribute("disabled", 'disabled');
      japanese.style.border = "none";
    } else if (parent) {
      document.getElementById("secondpage").innerHTML = japanese.value + '님 <br> 입장 도와드리겠습니다';
      firstpage.style.display = "none";
      secondpage.style.display = "block";
    }
  });

  function removeWord(japanese) {
    const savedWords = JSON.parse(localStorage.getItem("words")) || [];
    const updatedWords = savedWords.filter(word => word.japanese !== japanese);
    localStorage.setItem("words", JSON.stringify(updatedWords));
  }

  var secondpage = document.getElementById("secondpage");
  var firstpage = document.getElementById("firstpage");

  function back1() {
    firstpage.style.display = "block";
    secondpage.style.display = "none";
  }