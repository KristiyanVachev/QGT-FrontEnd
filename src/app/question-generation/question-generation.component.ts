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

  constructor(private questionGenerationService: QuestionGenerationService) { }

  ngOnInit() {
    // this.getHeroes();
  }

  // getQuestions(): void {
  //   this.questionGenerationService.getQuestions()
  //   .subscribe(questions => this.questions = questions);
  // }

  generate(text: string, count: number): void {

    if (!text) { return; }

    let req = new questionGenerationRequest()
    req.text = text.trim()
    req.count = count

    this.questions = []

    this.questionGenerationService.generate(req)
      .subscribe(questions => {
        
        this.questions = []
        questions.forEach(questionJson => {
          this.questions.push(JSON.parse(JSON.parse(JSON.stringify(questionJson))))
          this.addAnswers()
        });

      });
  }

  checkAnswer(quesiton: Question, answer: string){
    if (quesiton.answerText == answer){
      alert("Yeeeeeey!")
    }
    else{
      alert("Wrooonong!")
    }
  }

  addAnswers(){
    this.questions.forEach(q => {
      q.answers = [];

      q.distractors.forEach(d => {
        q.answers.push(d)
      });

      q.answers.push(q.answerText);

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
