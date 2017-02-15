var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var port = 8787;

var url = 'http://www.indeed.com/cmp/Fuze-Lab/jobs/Entry-Junior-PHP-Jquery-MySQL-Coder-Team-Member-01790db21236725e';

request(url, function(err, resp, body) {
	var $ = cheerio.load(body);
	var company = $('.company').text();
	var jobTitle = $('.jobtitle font').text();
	var location = $('.location').text();
	var summary = $('#job_summary p').text();

	var job = {
		company: company,
		location: location,
		jobTitle: jobTitle,
		summary: summary
	};

	var data = JSON.stringify(job, null, 2);

	fs.writeFile('data.json', data, function(err) {
		return err ? console.error(err) : console.log('write to data.json succeed');
	})
});

app.listen(port);
console.log('server is running on port ' + port);
