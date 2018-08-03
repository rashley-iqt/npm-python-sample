#!/usr/bin/env python3
import logging
import sys
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def initialize_logging():
    """ Initialized the default logging to STDOUT """
    if not app.debug:
        print('Setting up logging...')
 
        # Get the apps logging level or default to INFO
        log_level = app.config.get('LOGGING_LEVEL')
        if not log_level:
            log_level = logging.INFO
 
        # Set up default logging for submodules to use STDOUT
        fmt = '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
        logging.basicConfig(stream=sys.stdout, level=log_level, format=fmt)
 
        # Make a new log handler that uses STDOUT
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(logging.Formatter(fmt))
        handler.setLevel(log_level)
 
        # Remove the Flask default handlers and use our own
        del app.logger.handlers[:]
        app.logger.addHandler(handler)
        app.logger.setLevel(log_level)
        app.logger.info('Logging handler established')

@app.route('/api/v1/points', methods=['GET', 'POST'])
def transformPoints():
	app.logger.info(request.get_json()["points"])
	points = request.get_json()["points"]
	results = []
	for item in points:
		if item is int or str(item).isdigit():
			results.append(int(item) * 5)
		else:
			app.logger.info("{0} is not an integer.".format(item))
	app.logger.info(results)
	return jsonify(results)

if __name__ == '__main__':
	initialize_logging()
	print(app.debug)
	app.logger.debug("logging started")
	app.run(port='5001', debug=True)
     