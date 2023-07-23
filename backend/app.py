import os
import ezkl
import subprocess
from flask_cors import CORS
from flask import Flask, jsonify, request
from transformers import AutoTokenizer
from petals import AutoDistributedModelForCausalLM

app = Flask(__name__)
cors = CORS(app, resources={r"/run_model": {"origins": "*"}})

model_name = "enoch/llama-65b-hf"


tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=False, add_bos_token=False)
model = AutoDistributedModelForCausalLM.from_pretrained(model_name)
model = model.cuda()


@app.route('/run_model', methods=['POST'])
def run_model():
    data = request.json
    max_new_tokens = int(data['max_new_tokens'])

    inputs = tokenizer(data['input'], return_tensors="pt")["input_ids"].cuda()
    # code inputs with zk-proof
    outputs = model.generate(inputs, max_new_tokens=max_new_tokens)
    # decode outputs
    output_text = tokenizer.decode(outputs[0])

    return jsonify(result=output_text)


@app.route('/start_server', methods=['GET'])
def start_server():
    command = 'sudo docker run -p 31330:31330 --ipc host --gpus all --volume petals-cache:/cache --rm learningathome/petals:main python -m petals.cli.run_server --port 31330 enoch/llama-65b-hf --adapters timdettmers/guanaco-65b'
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
    output, error = process.communicate()
    if error:
        print(f"Error: {error}")
        return jsonify({"error": str(error)})
    else:
        return jsonify({"output": output.decode()})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
