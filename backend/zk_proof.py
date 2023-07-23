import os
import ezkl

circuit = MyModel()

# Train the model as you like here (skipped for brevity)

# After training, export to onnx (network.onnx) and create a data file (input.json)
ezkl.export(circuit, input_shape = [1,28,28])

# HERE WE SETUP THE CIRCUIT PARAMS
# WE GOT KEYS
# WE GOT CIRCUIT PARAMETERS
# EVERYTHING ANYONE HAS EVER NEEDED FOR ZK

model_path = os.path.join('network.onnx')
pk_path = os.path.join('test.pk')
vk_path = os.path.join('test.vk')
settings_path = os.path.join('settings.json')
params_path = os.path.join('kzg.params')

res = ezkl.setup(
        model_path,
        vk_path,
        pk_path,
        params_path,
        settings_path,
    )

assert res == True
assert os.path.isfile(vk_path)
assert os.path.isfile(pk_path)
assert os.path.isfile(settings_path)

# GENERATE A PROOF

data_path = os.path.join("input.json")
proof_path = os.path.join('test.pf')

res = ezkl.prove(
        data_path,
        model_path,
        pk_path,
        proof_path,
        params_path,
        "poseidon",
        "single",
        settings_path,
        False
    )

assert res == True
assert os.path.isfile(proof_path)

# VERIFY IT

res = ezkl.verify(
        proof_path,
        settings_path,
        vk_path,
        params_path,
    )

assert res == True
print("verified")