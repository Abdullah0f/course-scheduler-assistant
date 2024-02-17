function extractTermsAndCourses() {
    const table = document.querySelector('.section-content:nth-of-type(2) div[style="OVERFLOW: auto; WIDTH: 100%;"] table');
        if (!table) {
      console.error('Table not found inside the specified div.');
      return [];
    }
    
    const rows = table.querySelectorAll('tr');
    const termsWithCourses = [];
  
    rows.forEach((row, index) => {
      if (index === 0) return; // Skip header row
  
      const cells = row.querySelectorAll('td');

      // const tremNumAra = cells[0].textContent.trim() // Extract term number in Arabic from the first <td>

      if(cells.length <= 1 ){
        return;
      }

      const termCourses = {
        termNumber: index,
        courses: []
      };
  
      for (let i = 1; i < cells.length; i++) {
        const cellHtml = cells[i].innerHTML.trim();
        const [courseCodeHtml, courseName] = cellHtml.split('<br>').map(part => part.trim());
        const courseCode = courseCodeHtml.replace(/&nbsp;/g, '').trim();
        const bgColor = cells[i].getAttribute('bgcolor');
        let status = 'Unknown'; // Default status
        if (bgColor === '#736C68') status = 'Finished';
        else if (bgColor === 'LIGHTGRAY') status = 'Not Started';
        else if (bgColor === '#E0B149') status = 'Current Term';
  
        termCourses.courses.push({
          courseCode,
          courseName,
          status
        });
      }
  
      termsWithCourses.push(termCourses);
    });
  
    return termsWithCourses;
  }

import { readFileSync, writeFileSync } from 'fs';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

// Read the HTML file 
const html = readFileSync('stuPlan.html', 'utf-8');

const dom = new JSDOM(html);
const document = dom.window.document;

const extractedData = extractTermsAndCourses(document);

// Save the result in a JSON file
writeFileSync('output.json', JSON.stringify(extractedData, null, 2));