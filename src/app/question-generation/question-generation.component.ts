import { Component, OnInit } from '@angular/core';
import { Question } from '../_models/quesiton'
import { QuestionGenerationService } from '../question-generation.service';
import { questionGenerationRequest } from '../_models/questionGenerationRequest';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-question-generation',
  templateUrl: './question-generation.component.html',
  // styleUrls: ['./question-generation.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
  styleUrls: ['./question-generation.component.css', '../_themes/minty-bootstrap.min.css']
})
export class QuestionGenerationComponent implements OnInit {

  questions: Question[];
  spinnerOn = false;

  constructor(private questionGenerationService: QuestionGenerationService) { }

  ngOnInit() {
    // this.questions = [new Question(), new Question(), new Question()]
    // this.questions[0].question = 'What group is Oxygen a member of?'
    // this.questions[0].answer = 'Chalcogen group'
    // this.questions[0].distractors = ['Oxygen group', 'Diatomic group']
    
    // this.questions[1].question = 'What is the chemical element with the symbol O and atomic number 8?'
    // this.questions[1].answer = 'Oxygen'
    // this.questions[1].distractors = ['Dioxygen', 'Carbon dioxide', 'Nitrogen']
    
    // this.questions[2].question = 'What is lalalala lalalll alalllal al llalalal lal alala  is lalalala lalalll alalllal al llalalal lal alala  is lalalala lalalll alalllal al llalalal lal alala  is lalalala lalalll alalllal al llalalal lal alala'
    // this.questions[2].answer = 'something'
    // this.questions[2].distractors = ['one', 'two longer text that will get a bit over the box probably maybe', 'three']
    
  }

  // getQuestions(): void {
  //   this.questionGenerationService.getQuestions()
  //   .subscribe(questions => this.questions = questions);
  // }

  generate(text: string, count: number): void {

    let isValid = true
    let countTextBox = (document.getElementById('invalidMessageBox') as HTMLInputElement)
    countTextBox.textContent = ""

    if (!text || text.length > 5000 || text.length < 1) {
      countTextBox.textContent += "Document text must not be empty or over 5000 characters. "
      isValid = false;
    }
  
    if (count < 1 || count > 5){
      countTextBox.textContent += "Number of questions must be between 0 and 5."
      isValid = false;
    }
  
    if (!isValid){
      return;
    }

    this.spinnerOn = true

    let req = new questionGenerationRequest()
    req.context = text.trim()
    req.count = count

    this.questions = []

    this.questionGenerationService.generate(req)
      .subscribe(questions => {
        this.spinnerOn = false
        this.questions = questions;
      });
  }

  addIncorrect(quesitonIndex: string){

    let newDistractorTextBox = document.getElementById(quesitonIndex) as HTMLInputElement

    if (!newDistractorTextBox.value){
      return;
    }

    this.questions[quesitonIndex].distractors.push(newDistractorTextBox.value)

    newDistractorTextBox.value = ''
  }

  removeDistractor(quesiton: Question, indexOfDistractor: number){
    quesiton.distractors.splice(indexOfDistractor, 1)
  }

  removeQuestion(questionIndex: number){
    this.questions.splice(questionIndex, 1)
  }

  export(){

  }

  // checkAnswer(quesiton: Question, answer: string){
  //   if (quesiton.answer == answer){
  //     alert("Yeeeeeey!")
  //   }
  //   else{
  //     alert("Wrooonong!")
  //   }
  // }

  addAnswers(){
    this.questions.forEach(q => {
      q.answers = [];

      q.distractors.forEach(d => {
        q.answers.push(d)
      });

      q.answers.push(q.answer);

      q.answers = this.shuffle(q.answers)
    });


  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}



}
