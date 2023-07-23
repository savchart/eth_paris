## PETALS: Peer-to-Peer Transfer and Layer Sharing for Efficient Fine-Tuning of Large Models
### Introduction
PETALS — a system for inference and
fine-tuning of large models collaboratively by
joining the resources of multiple parties.
Based on Torrent principle


link to the paper: https://arxiv.org/pdf/2209.01188.pdf
github repo: https://github.com/bigscience-workshop/petals

## Discussion and future work
**Incentives for peers to contribute.** In PETALS,
peers using the client are not required to run a
server. This may lead to an imbalance between supply (peers who dedicate GPUs to serve model layers) and demand (peers using the servers to perform
inference or fine-tuning for their own needs) in the
network. One way to encourage users to serve
model layers is to introduce a system of incentives:
peers running servers would earn special points,
which can be spent on high-priority inference and
fine-tuning or exchanged for other rewards.

**Privacy.** An important limitation of our approach
is that peers serving the first layers of the model can
use their inputs to recover input tokens. Thus, people working with sensitive data should limit their
clients to only use trusted servers or, alternatively,
set up their own isolated PETALS swarm.
This limitation may be addressed in future using
secure multi-party computing (Evans et al., 2018)
or privacy-preserving hardware (NVIDIA, 2022).

**Security.** We assume that servers in our system
are run by many independent parties. In practice,
some of them may turn out to be faulty and return
incorrect outputs instead of the actual results of forward and backward passes. This may happen due
to a malicious intent to influence other people’s outputs or, when rewards are introduced (as described
above), to earn a reward for serving layers without
actually performing the calculations.
A possible way to address these issues would
be to use an economically motivated approach.
Some servers may vouch for the correctness of their
outputs (e.g., in exchange for increased inference
price) by depositing a certain number of points as
a pledge. Then, for each request, they announce a
cryptographic hash of the input and output tensors,
so anyone having the inputs can check whether the
outputs are correct.
If someone finds a mismatch confirmed by a
trusted third party, they can claim the server’s
pledge as a reward. In practice, it may be a client
who suspects that they received wrong outputs or
a “bounty hunter” sending requests to different
servers in the hope of catching errors. While this
approach still leaves a chance of receiving wrong
outputs, it makes cheating costly and creates an
incentive to quickly expose the malicious servers.

**Making changes to the main model.** As discussed in Section 2.2, distributed parameterefficient fine-tuning makes it easy for users to apply
the base model to new tasks. In Section 2.3, we also
described how these updates can be easily shared
and reused by others. This capability provides a
meaningful step towards collaborative improvement of machine learning models (Raffel, 2021):
as more and more users train the base model, it will
effectively become more capable over time.
Furthermore, we might expect the model parameters that perform best on a specific task to change
over time. Similarly to version control systems
for code, it would be useful to track versions of
fine-tuned model parameters as they change. A
system for rapidly testing the performance of a set
of parameters on “living benchmarks” (Kiela et al.,
2021; Gehrmann et al., 2022; Gao et al., 2021)
would be valuable to ensure that subsequent versions improve the desired capabilities.
Apart from adaptation to new tasks, it would also
be useful to eventually update the main model. Ideally, such updates could be tracked in a principled
way. Users of PETALS could specify the versions
of the model they want to use, and servers could
indicate which versions they support. Introducing a
newer version of the model then reduces to adding
a new group of layers, which then naturally supersedes older parameters based on the approach from
Section 3.2. Similarly, fine-tuned adapters could
be annotated with tags denoting the model version
they are applicable for. Such fine-grained model
versioning is currently uncommon but would be
straightforward to add to PETALS.

## Possible application Gnosis Chain and Filecoin for PETALS
### 1. Incentives for peers to contribute:
Use Filecoin's blockchain-based incentive mechanism to encourage peers to provide their GPUs for server use. For each unit of computation they serve, they earn Filecoin tokens which can be used to pay for services or traded for other currencies.

### 2. Privacy:
To protect the data used in the PETALS swarm, you could use zk-proof technologies. zk-proof technologies are privacy-preserving methods that allow someone to prove that a statement is true, without revealing any information beyond the validity of the statement itself. This could ensure that even though peers may serve the first layers of a model, they will not be able to glean any information about the input tokens.

### 3. Security:
The PETALS network could leverage the smart contract capabilities of the Filecoin Virtual Machine (FVM) and Gnosis Chain to help ensure the integrity of the system. As described in the problem statement, servers can vouch for the correctness of their outputs by staking a certain number of tokens. If the output is found to be incorrect, the tokens are forfeit. The smart contracts would handle this process, ensuring that it's fair and transparent.

### 4. Making changes to the main model:
IPFS can be used to handle versioning and distribution of the models. Each model (or version of a model) could be stored as a file in the IPFS network, and updates would simply involve adding new files and providing the hashes to those who need them.
Furthermore, Bacalhau's Compute Over Data (CoD) functionality could be used to perform rapid testing and verification of new parameters on "living benchmarks" without needing to move the data around.

### 5. Traffic Management:
IPFS could be utilized to distribute the load across the network, reducing the amount of traffic for any single participant. This could mitigate the potential for a server to interfere with other applications due to excessive traffic.

### 6. Model Outputs Verification:
As for verifying the model outputs, you could use the consensus mechanism inherent in blockchain systems like Filecoin or Gnosis Chain. By having multiple servers compute the outputs and then agreeing on the result based on a majority rule, you can minimize the chance of accepting faulty or malicious outputs.

### 7. AI Safety:
The use of public and transparent smart contracts on the Filecoin Virtual Machine (FVM) and Gnosis Chain can also contribute to AI safety by enforcing rules and guidelines for behavior in the network.

### 8. Version Control and Updates:
IPFS and Filecoin can provide a decentralized solution for versioning and distributing model updates. This allows for efficient propagation of updates, without the need for centralized servers.

## Step by step implementation of PETALS on Gnosis Chain and Filecoin

### 1. Server Registration: 
An entity intending to serve as a PETALS server registers its node on the network. During this step, it stakes a certain number of tokens using a smart contract on the Filecoin Virtual Machine (FVM) or Gnosis Chain. The tokens act as a security deposit.

### 2. Service Provision: 
The PETALS server starts accepting requests and serving model layers. For each request, the server computes the forward and backward passes and returns the output tensors.

### 3. Client Request: 
A PETALS client sends a request to a server for running specific model layers. The client will use zk-SNARKs or similar zk-proof systems to encrypt the input data, allowing the client to prove they know the input data, without revealing the actual data.

### 4. Output Verification:
When a PETALS client receives the output tensors from a server, it could optionally send the same inputs to another server for verification. If both outputs match, the process continues normally.

### 5. Dispute Resolution: 
If a client finds a mismatch between the outputs received from two different servers, they initiate a dispute by notifying the smart contract on the FVM or Gnosis Chain. The smart contract then triggers an independent audit by a trusted third party or by the network.

### 6. Audit Process: 
The independent audit involves sending the same inputs to a set of randomly selected servers in the network. The majority output is then considered as the correct output.

### 7. Resolution:
If the disputed server's output matches the audit result, no action is taken, and the server continues its operations. If the disputed server's output does not match the audit result, the smart contract is triggered to seize the staked tokens. These tokens could then be redistributed to the client that initiated the dispute and/or used to cover the costs of the audit.

### 8. Continued Operation or Disconnection:
Post-resolution, if the server's tokens were seized, it needs to re-stake tokens to continue its operation. If it fails to do so, the server is disconnected from the PETALS network.