import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lookbook',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lookbook.component.html'
})
export class LookbookComponent {
  lookbookData = {
    title: '2019 #lookbook',
    description: `Fusce urna quam, euismod sit amet mollis quis, vestibulum quis velit. Vestibulum malesuada
                  aliquet libero viverra cursus. Aliquam erat volutpat. Morbi id dictum quam, ut commodo
                  lorem. In at nisi nec arcu porttitor aliquet vitae at dui. Sed sollicitudin nulla non leo
                  viverra scelerisque. Phasellus facilisis lobortis metus, sit amet viverra lectus finibus ac.
                  Aenean non felis dapibus, placerat libero auctor, ornare ante. Morbi quis ex eleifend,
                  sodales nulla vitae, scelerisque ante. Nunc id vulputate dui. Suspendisse consectetur rutrum
                  metus nec scelerisque.`,
    image: 'assets/img/lookbok.jpg',
    imageText: 'fashion'
  };
}